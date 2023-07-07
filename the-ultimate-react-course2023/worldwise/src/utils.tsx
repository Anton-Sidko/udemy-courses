export const formatDate = (date: string | null) => {
  if (date === null) return null;

  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));
};

export const flagEmojiToPNG = (flag: string) => {
  const countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt(0))
    .map((char) => String.fromCharCode((char as number) - 127397).toLowerCase())
    .join('');

  return (
    <img
      src={`https://flagcdn.com/24x18/${countryCode}.png`}
      alt="country flag"
    />
  );
};
