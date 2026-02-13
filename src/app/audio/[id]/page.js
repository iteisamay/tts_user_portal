import NewsHead from "../../../../components/NewsHead";
import { notFound } from "next/navigation";
export const revalidate = 180;

/* ---------------- Helper ---------------- */
function formatText(text = "") {
    return text;
}

/* ---------------- Safe fetch for metadata ---------------- */
async function getAudioByIdSafe(id) {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT_TWO}/api/v1/tts/get/${id}`,
            { cache: "no-store" }
        );

        if (!res.ok) return null;

        const json = await res.json();

        if (!json?.data || !Array.isArray(json.data) || json.data.length === 0) {
            return null;
        }

        return json.data[0];
    } catch {
        return null;
    }
}

/* ---------------- Main fetch ---------------- */
async function getAudioById(id) {
    let res;

    //Catch ONLY backend crash / network failure
    try {
        res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT_TWO}/api/v1/tts/get/${id}`,
            { cache: "no-store" }
        );
    } catch {
        //Backend is down / unreachable
        return { serviceDown: true };
    }

    //Backend reachable → handle HTTP cases
    if (res.status === 429) {
        return {
            title: "Too many requests. Please try again later.",
            language: "",
        };
    }

    if (!res.ok) {
        //Wrong ID / bad route → real 404
        notFound();
    }

    const json = await res.json();

    if (!json?.data || !Array.isArray(json.data) || json.data.length === 0) {
        //Valid backend but no data → real 404
        notFound();
    }

    return json.data[0];
}

//SSR
// export async function generateStaticParams() {
//     const res = await fetch(
//         `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT_TWO}/api/v1/tts/get/${id}`,
//         { next: { revalidate: 300 } }
//     );

//     if (!res.ok) return [];
//     const json = await res.json();

//     return json.data.map((item) => ({
//         id: item.id.toString(),
//     }));
// }

/* ---------------- Metadata ---------------- */
export async function generateMetadata({ params }) {
    const { id } = await params;
    const data = await getAudioByIdSafe(id);

    if (!data) {
        return {
            title: "Audio Not Found",
            description: "The requested audio could not be found.",
            robots: { index: false, follow: false },
        };
    }

    const title = formatText(data.title);
    const description =
        data.desc || data.tts_text?.slice(0, 160) || "ABCD News Audio";

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: `${process.env.NEXT_PUBLIC_DOMAIN}/audio/${id}`,
            siteName: `${process.env.NEXT_PUBLIC_DOMAIN}`,
            images: data.thumbnail
                ? [
                    {
                        url: `${process.env.NEXT_PUBLIC_DOMAIN}/s2/images/${data.thumbnail}`,
                        width: 1200,
                        height: 630,
                        alt: data.thumbnail_alt || title,
                    },
                ]
                : [],
            type: "article",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: data.thumbnail ? [`${process.env.NEXT_PUBLIC_DOMAIN}/images/${data.thumbnail}`] : [],
        },
    };
}

/* ---------------- Page ---------------- */
export default async function AudioPage({ params }) {
    const { id } = await params;

    const data = await getAudioById(id);

    /* ---------- Service Inactive UI ---------- */
    if (data?.serviceDown) {
        return (
            <div className="service-inactive min-h-screen flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-2xl font-semibold text-gray-800 mb-3">
                    This Service is Currently Inactive
                </h1>
                <p className="text-gray-600 max-w-md">
                    Please stay tuned with us. We are working to restore the
                    service as soon as possible.
                </p>
            </div>
        );
    }

    const title = formatText(data.title);
    const language = formatText(data.language || "");

    /* -------- JSON-LD -------- */
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "AudioObject",
        name: title,
        description: data.description || "",
        contentUrl: data.audio_key || "",
        encodingFormat: "audio/mpeg",
        duration: data.duration || "",
        inLanguage: data.language || "",
        thumbnailUrl: data.thumbnail || undefined,
        datePublished: data.tts_time || "",
        dateModified: data.tts_mod_time || "",
        publisher: {
            "@type": "Organization",
            name: "Ei Samay",
            logo: {
                "@type": "ImageObject",
                url: "https://images.assettype.com/eisamay/2024-10-23/26heexbc/HeaderLogo.png",
            },
        },
        potentialAction: {
            "@type": "ListenAction",
            target: data.audio_key || "",
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(jsonLd),
                }}
            />

            <NewsHead
                id={id}
                language={language}
                title={title}
                audioUrl={data.audio_key || ""}
                thumbnail={data.thumbnail || ""}
                publishedAt={data.tts_time || ""}
                description={data.description || ""}
                duration={data.duration || ""}
            />
        </>
    );
}













// import NewsHead from "../../../../components/NewsHead";
// import { notFound } from "next/navigation";

// /* ----------------------------------
//    Helper
// ----------------------------------- */
// function formatText(text = "") {
//   return text;
// }

// /* ----------------------------------
//    STATIC AUDIO DATA (Mock Backend)
// ----------------------------------- */
// const STATIC_AUDIO_DATA = {
//   "1000043": {
//     id: "1000043",
//     title: "Breaking News: Market Update",
//     description: "Stock markets saw a major shift today as global indices reacted to inflation data.",
//     language: "English",
//     audio_key: "market-update.mp3",
//     thumbnail: "demooo.jpg",
//     duration: "PT45S",
//     tts_time: "2025-01-01T10:00:00Z",
//     tts_mod_time: "2025-01-01T10:00:00Z",
//   },

//   "1000044": {
//     id: "1000044",
//     title: "Weather Alert",
//     description: "Heavy rainfall expected across several regions today.",
//     language: "English",
//     audio_key: "weather-alert.mp3",
//     thumbnail: "demooo.jpg",
//     duration: "PT30S",
//     tts_time: "2025-01-01T11:00:00Z",
//     tts_mod_time: "2025-01-01T11:00:00Z",
//   },
// };

// /* ----------------------------------
//    Static Data Fetcher
// ----------------------------------- */
// async function getAudioById(id) {
//   const data = STATIC_AUDIO_DATA[id];

//   if (!data) {
//     throw new Error("Audio not found");
//   }

//   return data;
// }

// /* ----------------------------------
//    SEO Metadata
// ----------------------------------- */
// export async function generateMetadata({ params }) {
//   const { id } = await params;

//   let data;
//   try {
//     data = await getAudioById(id);
//   } catch {
//     return {};
//   }

//   const title = formatText(data.title);
//   const description = formatText(data.description);

//   return {
//     title,
//     description,
//     openGraph: {
//       title,
//       description,
//       url: `http://localhost:3000/audio/${id}`,
//       siteName: "ABCD News Audio",
//       images: data.thumbnail
//         ? [
//             {
//             url: `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/images/${data.thumbnail}`,
//               width: 1200,
//               height: 630,
//               alt: title,
//             },
//           ]
//         : [],
//       type: "article",
//     },
//     twitter: {
//       card: "summary_large_image",
//       title,
//       description,
//       images: data.thumbnail
//         ? [`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/images/${data.thumbnail}`]
//         : [],
//     },
//   };
// }

// /* ----------------------------------
//    Page Component
// ----------------------------------- */
// export default async function AudioPage({ params }) {
//   const { id } = await params;

//   let data;
//   try {
//     data = await getAudioById(id);
//   } catch {
//     notFound(); // ✅ show 404 if id not in static data
//   }

//   const title = formatText(data.title);
//   const language = formatText(data.language);

//   /* -------- JSON-LD -------- */
//   const jsonLd = {
//     "@context": "https://schema.org",
//     "@type": "AudioObject",
//     name: title,
//     description: data.description,
//     contentUrl: data.audio_key,
//     encodingFormat: "audio/mpeg",
//     duration: data.duration,
//     inLanguage: language,
//     thumbnailUrl: data.thumbnail
//       ? `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/images/${data.thumbnail}`
//       : undefined,
//     datePublished: data.tts_time,
//     dateModified: data.tts_mod_time,
//     publisher: {
//       "@type": "Organization",
//       name: "Ei Samay",
//       logo: {
//         "@type": "ImageObject",
//         url: "https://images.assettype.com/eisamay/2024-10-23/26heexbc/HeaderLogo.png",
//       },
//     },
//     potentialAction: {
//       "@type": "ListenAction",
//       target: data.audio_key,
//     },
//   };

//   return (
//     <>
//       {/* Structured Data */}
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify(jsonLd),
//         }}
//       />

//       {/* Page UI */}
//       <NewsHead
//         id={id}
//         language={language}
//         title={title}
//         audioUrl={data.audio_key}
//         thumbnail={data.thumbnail}
//         publishedAt={data.tts_time}
//         description={data.description}
//       />
//     </>
//   );
// }
