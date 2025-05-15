
export const getPlaceholderImage = (name) => {
    // Using initials for placeholder image with UI Avatars
    const initials = name
      .split(' ')
      .map((n) => n[0])
      .join('');
    return `https://ui-avatars.com/api/?name=${initials}&background=random&color=fff&size=128`;
};