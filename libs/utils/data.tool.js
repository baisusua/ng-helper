const ReduceData = function (data, isRead) {
    let value = data;;
    if (!isRead) {
        try {
            value = JSON.stringify(data);
        } catch (error) {
            value = data;
        }
    }
    if (isRead) {
        try {
            value = JSON.parse(data);
        } catch (error) {
            value = data;
        }
    }

    return value;
}
module.exports = ReduceData;