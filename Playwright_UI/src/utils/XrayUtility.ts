export class XrayUtility {
    static addCustomFields(testInfo) {
        // Customize your fields here
        testInfo.annotations.push({
            key: 'customField',
            value: 'Custom Value'
        });
    }
}