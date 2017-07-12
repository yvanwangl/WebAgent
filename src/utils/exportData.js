/**
 * Created by wyf on 2017/4/13.
 */
// Test script to generate a file from JavaScript such
// that MS Excel will honor non-ASCII characters.

let testJson = [{
    "name": "Tony Pe?a",
    "city": "New York",
    "country": "United States",
    "birthdate": "1978-03-15",
    "amount": 42

}, {
    "name": "Ζαλ?νη? Thessaloniki",
    "city": "Athens",
    "country": "Greece",
    "birthdate": "1987-11-23",
    "amount": 42
}];

// Simple type mapping; dates can be hard
// and I would prefer to simply use `datevalue`
// ... you could even add the formula in here.
let testTypes = {
    "name": "String",
    "city": "String",
    "country": "String",
    "birthdate": "String",
    "amount": "Number"
};

const emitXmlHeader = function(dataTypes) {
    let headerRow = '<ss:Row>\n';
    for (let colName in dataTypes) {
        headerRow += '  <ss:Cell>\n';
        headerRow += '    <ss:Data ss:Type="String">';
        headerRow += colName + '</ss:Data>\n';
        headerRow += '  </ss:Cell>\n';
    }
    headerRow += '</ss:Row>\n';
    return '<?xml version="1.0"?>\n' +
        '<ss:Workbook xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">\n' +
        '<ss:Worksheet ss:Name="Sheet1">\n' +
        '<ss:Table>\n\n' + headerRow;
};

const emitXmlFooter = function() {
    return '\n</ss:Table>\n' +
        '</ss:Worksheet>\n' +
        '</ss:Workbook>\n';
};

const jsonToSsXml = function(jsonObject, dataTypes) {
    let row;
    let col;
    let xml;
    let data = typeof jsonObject != "object" ? JSON.parse(jsonObject) : jsonObject;

    xml = emitXmlHeader(dataTypes);

    for (row = 0; row < data.length; row++) {
        xml += '<ss:Row>\n';

        for (col in data[row]) {
            xml += '  <ss:Cell>\n';
            xml += '    <ss:Data ss:Type="' + dataTypes[col] + '">';
            xml += data[row][col] + '</ss:Data>\n';
            xml += '  </ss:Cell>\n';
        }

        xml += '</ss:Row>\n';
    }

    xml += emitXmlFooter();
    return xml;
};

/*console.log(jsonToSsXml(testJson));*/

const download = function(content, filename, contentType) {
    let a = document.createElement("a");
    a.id="lnkDwnldLnk";
    let blob = new Blob([content], {
        'type': contentType
    });
    a.href = window.URL.createObjectURL(blob);
    a.download = filename;

    a.click();
    document.body.removeChild(a);
};

/*导出数据方法*/
export default function exportData(jsonData, dataTypes, filename){
    download(
        jsonToSsXml(jsonData, dataTypes),
        filename?`${filename}.xls`:'test.xls',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
}