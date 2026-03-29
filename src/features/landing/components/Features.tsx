import { useState } from "react";
import { m } from "framer-motion";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { features } from "../data";

export const Features = () => {
  const [activeTab, setActiveTab] = useState(features[0]?.id || "portal");

  if (!features.length) return null;

  return (
    <section className="bg-muted/30 py-16 md:py-24">
      <div className="container">
        <div className="mx-auto mb-10 max-w-3xl text-center md:mb-16">
          <h2 className="mb-3 text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl">
            تجربة علاجية رقمية
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            نسخر التكنولوجيا لخدمة صحتكم وراحتكم.
          </p>
        </div>

        <Tabs value={activeTab} className="w-full" onValueChange={setActiveTab}>
          <div className="mb-8 md:mb-12">
            <TabsList className="bg-background mx-auto grid h-auto w-full max-w-lg grid-cols-2 gap-1 rounded-2xl border p-1.5 sm:grid-cols-3">
              {features.map((feature) => (
                <TabsTrigger
                  key={feature.id}
                  value={feature.id}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground min-h-11 w-full rounded-xl px-3 py-2 text-xs font-semibold transition-all sm:px-5 sm:text-sm"
                >
                  <feature.icon className="ml-2 h-4 w-4 shrink-0" />
                  {feature.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <div className="bg-background border-border/50 relative overflow-hidden rounded-2xl border shadow-xl md:rounded-3xl">
            {features.map((feature) => (
              <TabsContent key={feature.id} value={feature.id} className="m-0">
                <m.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid min-h-120 lg:grid-cols-5"
                >
                  <div className="bg-muted relative order-1 h-56 overflow-hidden sm:h-72 lg:order-2 lg:col-span-2 lg:h-auto">
                    <m.img
                      initial={{ scale: 1.08 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5 }}
                      src={feature.image}
                      alt={feature.title}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="from-background/55 absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t to-transparent lg:hidden" />
                  </div>

                  <div className="order-2 flex flex-col justify-center p-5 text-right sm:p-8 lg:order-1 lg:col-span-3 lg:p-10">
                    <div className="bg-primary/10 text-primary mb-5 flex h-11 w-11 items-center justify-center rounded-xl sm:h-12 sm:w-12">
                      <feature.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>

                    <h3 className="mb-3 text-xl leading-snug font-bold sm:text-2xl lg:text-3xl">
                      {feature.title}
                    </h3>

                    <p className="text-muted-foreground mb-6 text-sm leading-7 sm:text-base sm:leading-8 lg:mb-8 lg:text-lg">
                      {feature.description}
                    </p>

                    <ul className="grid gap-3 sm:grid-cols-2">
                      {feature.benefits.map((benefit, i) => (
                        <li
                          key={i}
                          className="bg-muted/40 border-border/60 flex items-center gap-3 rounded-xl border px-3 py-2.5"
                        >
                          <div className="bg-primary h-2 w-2 shrink-0 rounded-full" />
                          <span className="text-foreground/85 text-sm font-medium sm:text-base">
                            {benefit}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </m.div>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </section>
  );
};
