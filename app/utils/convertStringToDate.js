export function convertStringToDate(text) {
    let parts = text.split(", ");
    let part1 = parts[0].split("/");
    let part2 = parts[1].split("h");

    return new Date(part1[2], part1[1] - 1, part1[0], part2[1], part2[0], 0);
}
