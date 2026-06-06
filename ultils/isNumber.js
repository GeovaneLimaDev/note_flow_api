export function isNumber (item) {
    return typeof item === 'number' || Number.isFinite(item)
}