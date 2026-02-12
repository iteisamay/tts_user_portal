export const getMobileMenuStyles = (darkMode) => ({
    Cardbg: darkMode
        ? "bg-gray-700"
        : "bg-white ",

    Headerbg: darkMode
        ? "from-black to-gray-700"
        : "from-white to-gray-100",

    Playlistbg: darkMode
        ? "bg-gray-700"
        : "bg-white",

    Playlisticons: darkMode
        ? "text-white"
        : "text-gray-500",
});