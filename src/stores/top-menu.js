import { atom } from "recoil";

const topMenu = atom({
  key: "topMenu",
  default: {
    menu: [
      {
        icon: "Folder",
        pathname: "/",
        title: "File Manager",
      },

    ],
  },
});

export { topMenu };
