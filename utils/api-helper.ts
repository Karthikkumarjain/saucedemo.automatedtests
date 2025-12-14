/**
 * String formatter.
 * Replaces {0}, {1}, {2}... with corresponding arguments.
 *
 * @param str - The string to be formatted
 * @param args - Values to replace placeholders
 * @returns Formatted string
 */

export const manipulateJson = (
  str: string,
  ...args: Array<string | number | boolean | null | undefined>
): string => {
  return str.replace(/{(\d+)}/g, (match: string, index: string): string => {
    const value = args[Number(index)];
    return value !== undefined && value !== null ? String(value) : "";
  });
};


/*
export → allows use in other files

str: string → input string containing placeholders

...args → rest parameter (accepts multiple values)

args is an array of allowed primitive types

Function always returns a string


replace() scans the string for placeholders

Regex /{(\d+)}/g:

{ and } → literal braces

(\d+) → one or more digits (0, 1, 2…)

g → global search (replace all matches)

match → full match (e.g. {0})

index → captured number inside braces (e.g. "0")

Converts index from string to number

Fetches the corresponding value from args

Prevents undefined or null from appearing in output

Converts value to string

Returns empty string if no value exists

*/