export function getNestedProperty(obj: any, propertyPath: string): any {
    return propertyPath.split('.').reduce((acc, part) => acc && acc[part], obj);
}