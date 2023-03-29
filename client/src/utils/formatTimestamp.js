export const formatTimestamp = (timestamp, lang = "en-US") => {
    const date = new Date(timestamp)
    const options = {
        weekday: "long",
        month: "long",
        day: "numeric",
    };

    // "Thursday, December 20, 2012, UTC"
    return date.toLocaleDateString(lang, options)
}