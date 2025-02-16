export const tabelRowVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    filter: "blur(10px)",
  },
  visible: (index: number) => ({
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      delay: index * 0.1,
      scale: {
        delay: index * 0.1,
      },
    },
  }),
};
