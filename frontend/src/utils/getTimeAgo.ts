export const getTimeAgo = (dateString: string): string => {
  const date: Date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return "تاريخ غير صالح";
  }

  const now: Date = new Date();
  const diffInSeconds: number = Math.floor(
    (now.getTime() - date.getTime()) / 1000
  );

  const units: {
    label: string;
    dualLabel?: string;
    pluralLabel: string;
    seconds: number;
  }[] = [
    {
      label: "سنة",
      dualLabel: "سنتان",
      pluralLabel: "سنوات",
      seconds: 365 * 24 * 60 * 60,
    },
    {
      label: "شهر",
      dualLabel: "شهران",
      pluralLabel: "شهور",
      seconds: 30 * 24 * 60 * 60,
    },
    {
      label: "أسبوع",
      dualLabel: "أسبوعان",
      pluralLabel: "أسابيع",
      seconds: 7 * 24 * 60 * 60,
    },
    {
      label: "يوم",
      dualLabel: "يومان",
      pluralLabel: "أيام",
      seconds: 24 * 60 * 60,
    },
    {
      label: "ساعة",
      dualLabel: "ساعتان",
      pluralLabel: "ساعات",
      seconds: 60 * 60,
    },
    { label: "دقيقة", dualLabel: "دقيقتان", pluralLabel: "دقيقة", seconds: 60 },
    { label: "ثانية", dualLabel: "ثانيتان", pluralLabel: "ثوانٍ", seconds: 1 },
  ];

  for (const unit of units) {
    const interval: number = Math.floor(diffInSeconds / unit.seconds);
    if (interval >= 1) {
      if (interval === 1) {
        return `منذ ${unit.label} ${
          unit.label === "يوم" || unit.label === "أسبوع" || unit.label === "شهر"
            ? "واحد"
            : "واحدة"
        }`;
      } else if (interval === 2) {
        return `منذ ${unit.dualLabel}`;
      } else if (interval <= 10) {
        return `منذ ${interval} ${unit.pluralLabel}`;
      } else {
        return `منذ ${interval} ${unit.pluralLabel}`;
      }
    }
  }

  return "الآن";
};
