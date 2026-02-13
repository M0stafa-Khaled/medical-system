import { m } from "framer-motion";
import { fadeInUp, staggerContainer } from "../animations";
import { specialtiesClinics } from "../data";

export const SpecializedClinics = () => {
  return (
    <section id="specialized-clinics" className="bg-muted/30 py-24">
      <div className="container">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <m.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl"
          >
            عياداتنا التخصصية
          </m.h2>
          <m.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg"
          >
            نقدم رعاية طبية شاملة في مكان واحد، بأيدي نخبة من الاستشاريين.
          </m.p>
        </div>

        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {specialtiesClinics.map((specialty, index) => (
            <m.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              className="bg-card border-border/50 hover:border-primary/50 group rounded-2xl border p-6 text-right shadow-sm transition-all duration-300 hover:shadow-lg"
            >
              <div className="bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-300">
                <specialty.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold">{specialty.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {specialty.description}
              </p>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
};
