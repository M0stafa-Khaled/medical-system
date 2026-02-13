import { m } from "framer-motion";
import { fadeInUp, staggerContainer } from "../animations";
import { systemFeatures } from "../data";

export const SystemOverview = () => {
  return (
    <section id="services" className="bg-muted/30 py-24">
      <div className="container">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <m.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl"
          >
            لماذا تختار مجمع عيادتي الطبي؟
          </m.h2>
          <m.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            نسعى جاهدين لتقديم تجربة علاجية متميزة تجمع بين الخبرة الطبية
            والراحة النفسية.
          </m.p>
        </div>

        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {systemFeatures.map((feature, index) => (
            <m.div
              key={index}
              variants={fadeInUp}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-card border-border/50 rounded-2xl border p-8 shadow-sm transition-shadow hover:shadow-md"
            >
              <div
                className={`h-14 w-14 rounded-xl ${feature.bg} mb-6 flex items-center justify-center ${feature.color}`}
              >
                <feature.icon className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-xl font-bold">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
};
