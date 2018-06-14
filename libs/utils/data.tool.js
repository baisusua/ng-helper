const ReduceData = function (data) {
    let value = data;;
    if (typeof data == 'object') {
        try {
            value = JSON.stringify(data);
        } catch (error) {
            value = data;
        }
    }
    if (typeof data == 'string') {
        try {
            value = JSON.parse(data);
        } catch (error) {
            value = data;
        }
    }

    return value;
}
module.exports = ReduceData;