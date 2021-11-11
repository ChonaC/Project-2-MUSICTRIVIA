module.exports = {
    // * Get the users ranking by getting the index and adding one
    get_rank: (index) => {
        return index + 1;
    },

    // * Convert the decimal score into a percentage value
    convert_percent: (decimal) => {
        return decimal * 100 + "%";
    },

    // * Format the date to MM/DD/YYYY
    format_date: (date) => {
        return date.toLocaleDateString("en-US");
    },
};
