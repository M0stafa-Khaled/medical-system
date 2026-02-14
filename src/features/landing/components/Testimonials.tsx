import { m } from "framer-motion";
import { fadeInUp, staggerContainer, scaleIn } from "../animations";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { Quote } from "lucide-react";
import { testimonials } from "../data";

export const Testimonials = () => {
  return (
    <section className="bg-background py-24">
      <div className="container">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <m.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl"
          >
            ماذا يقول مرضانا؟
          </m.h2>
          <p className="text-muted-foreground text-lg">
            فخورون بثقة آلاف المرضى وعائلاتهم.
          </p>
        </div>

        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-8 md:grid-cols-3"
        >
          {testimonials.map((testimonial, index) => (
            <m.div
              key={index}
              variants={fadeInUp}
              className="bg-card border-border/50 relative rounded-2xl border p-8 text-right shadow-sm"
            >
              <Quote className="text-primary/10 absolute top-8 left-8 h-8 w-8" />{" "}
              <p className="text-muted-foreground relative z-10 mb-8 leading-relaxed">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-4">
                <m.div variants={scaleIn}>
                  <Avatar className="border-background h-12 w-12 border-2 shadow-sm">
                    <AvatarImage
                      src={testimonial.image}
                      alt={testimonial.name}
                    />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </m.div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold">{testimonial.name}</h4>
                  <p className="text-primary text-xs">{testimonial.role}</p>
                </div>
              </div>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
};
