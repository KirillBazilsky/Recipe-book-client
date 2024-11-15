export const iconRandomizer = (icons: string[]) => {
    const remainingIcons = [...icons];
    
    return () => {
      if (remainingIcons.length === 0) {
        remainingIcons.push(...icons);
      }
  
      const randomIndex = Math.floor(Math.random() * remainingIcons.length);
      const icon = remainingIcons[randomIndex];
  
      remainingIcons.splice(randomIndex, 1);
  
      return icon;
    };
  };
  