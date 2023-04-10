export function capitalize (string: string): string{
    return string.split('')[0].toUpperCase() + string.slice(1)
}