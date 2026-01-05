// "use client";
// import { useEffect } from "react";

// const BannerAd = ({ slot = "default", className = "" }) => {
//   useEffect(() => {
//     // Trigger ad refresh if using ad network (GAM/AdSense/etc.)
//     if (window.adsbygoogle) {
//       try {
//         window.adsbygoogle.push({});
//       } catch (e) {
//         console.error(e);
//       }
//     }
//   }, []);

//   return (
//     <div
//       className={`bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-xs text-gray-500 rounded-md ${className}`}
//       style={{
//         width: "100%", // make it responsive width
//         maxWidth: "728px", // desktop max width
//         height: "90px", // default height for desktop
//       }}
//     >
//       <div
//         className="w-75 h-12.5 md:w-182 md:h-22.5 flex items-center justify-center"
//       >
//         Banner Ad – {slot}
//       </div>
//     </div>
//   );
// };

// export default BannerAd;



// <div
//       className={`dark:bg-slate-800 flex items-center justify-center rounded-md ${className}`}
//       style={{
//         width: "90%",
//         maxWidth: "728px",
//         height: "80px",
//       }}
//     >
//       {imageSrc ? (
//         <div className="w-75 h-12.5 md:w-182 md:h-22.5 relative">
//           <Image
//             src={imageSrc}
//             alt={`Banner Ad – ${slot}`}
//             fill
//             style={{ objectFit: "cover" }}
//             sizes="(max-width: 768px) 100vw, 200px"
//           />
//         </div>
//       ) : (
//         <div className="w-75 h-12.5 md:w-182 md:h-22.5 flex items-center justify-center text-xs text-gray-500">
//           Banner Ad – {slot}
//         </div>
//       )}
//     </div>





"use client";
import { useEffect } from "react";
import Image from "next/image";

const BannerAd = ({ slot = "default", className = "", imageSrc = "/banner.webp" }) => {
    useEffect(() => {
        // Trigger ad refresh if using ad network (GAM/AdSense/etc.)
        if (window.adsbygoogle) {
            try {
                window.adsbygoogle.push({});
            } catch (e) {
                console.error(e);
            }
        }
    }, []);

    return (
        <div
            className={`dark:bg-slate-800 flex items-center justify-center rounded-md ${className}`}
            style={{
                width: "100%",
                maxWidth: "728px",
                height: "auto",
            }}
        >
            {imageSrc ? (
                <div className="relative w-75 h-12.5 md:w-182 md:h-22.5">
                    <Image
                        src={imageSrc}
                        alt={`Banner Ad – ${slot}`}
                        fill
                        className="object-contain" 
                        sizes="(max-width: 768px) 300px, 728px"
                    />
                </div>
            ) : (
                <div className="w-75 h-12.5 md:w-182 md:h-22.5 flex items-center justify-center text-xs text-gray-500">
                    Banner Ad – {slot}
                </div>
            )}
        </div>
    );
};

export default BannerAd;


