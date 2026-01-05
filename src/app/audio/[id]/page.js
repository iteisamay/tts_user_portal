import NewsHead from "../../../../components/NewsHead";
import { notFound } from "next/navigation";

// Helper
function formatText(text = "") {
    return text;
}

// Backend API Fetch (Server-side)
async function getAudioById(id) {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/s1/api/v1/tts/get/${id}`
    //console.log(url)
    const res = await fetch(
        url,
        { cache: "no-store" }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch audio data");
    }

    const json = await res.json();

    if (!json?.data?.length) {
        throw new Error("Audio not found");
    }

    return json.data[0];
}

// SEO Metadata
export async function generateMetadata({ params }) {
    const { id } = await params;
    const data = await getAudioById(id);
    // console.log(data)

    const title = formatText(data.title);
    const description =
        data.desc || data.tts_text?.slice(0, 160) || "ABCD News Audio";

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: `https://yourdomain.com/audio/${id}`,
            siteName: "ABCD News Audio",
            images: data.thumbnail
                ? [
                    {
                        url: data.thumbnail,
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
            images: data.thumbnail ? [data.thumbnail] : [],
        },
    };
}

// Page Component
export default async function AudioPage({ params }) {
    const { id } = await params;
    let data;
    try {
        data = await getAudioById(id);
    } catch (error) {
        return notFound();
    }

    const title = formatText(data.title);
    const language = formatText(data.language);

    /* -------- JSON-LD -------- */
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "AudioObject",
        name: title,
        description: data.description,
        contentUrl: data.audio_url,
        encodingFormat: "audio/mpeg",
        duration: data.duration,
        inLanguage: data.language,
        thumbnailUrl: data.thumbnail || undefined,
        datePublished: data.tts_time,
        dateModified: data.tts_mod_time,
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
            target: data.audio_url,
        },
    };

    return (
        <>
            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(jsonLd),
                }}
            />

            {/* Page UI */}
            <NewsHead
                id={id}
                language={language}
                title={title}
                audioUrl={data.audio_url}
                thumbnail={data.thumbnail}
                publishedAt={data.tts_time}
                description={data.description}
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
//     audio_url: "market-update.mp3",
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
//     audio_url: "weather-alert.mp3",
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
//     contentUrl: data.audio_url,
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
//       target: data.audio_url,
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
//         audioUrl={data.audio_url}
//         thumbnail={data.thumbnail}
//         publishedAt={data.tts_time}
//         description={data.description}
//       />
//     </>
//   );
// }
