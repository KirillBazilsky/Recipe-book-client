const croppedRegexp = /^crop-[0-9]+/;

export const imageNameGenerate = (count: number, name?: string): string => {
  if (!name) {
    return "";
  }
  if (croppedRegexp.test(name)) {
    return name.replace(/^crop-[0-9]+/, `crop-${count}`);
  }

  return `crop-${count}-${name}`;
};
