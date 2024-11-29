/**
 * Convert a name to initials, e.g. "John Doe" -> "JD"
 * It will take the first letter of each word in the name
 * and maximum of 2 letters.
 */
export const toInitials = (name?: string) => {
  return (name || "")
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2);
};
