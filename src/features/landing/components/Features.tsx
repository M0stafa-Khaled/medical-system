import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { features } from "../data";

export const Features = () => {
  const [activeTab, setActiveTab] = useState("portal");

  return (
    <section className="bg-muted/30 py-24">
      <div className="container">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            تجربة علاجية رقمية
          </h2>
          <p className="text-muted-foreground text-lg">
            نسخر التكنولوجيا لخدمة صحتكم وراحتكم.
          </p>
        </div>

        <Tabs
          defaultValue="portal"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <div className="mb-12 flex justify-center overflow-x-auto pb-4">
            <TabsList className="bg-background h-auto rounded-full border p-2">
              {features.map((feature) => (
                <TabsTrigger
                  key={feature.id}
                  value={feature.id}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-6 py-3 text-sm font-medium transition-all"
                >
                  <feature.icon className="ml-2 h-4 w-4" />
                  {feature.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <div className="bg-background border-border/50 relative min-h-100 overflow-hidden rounded-3xl border shadow-xl">
            <AnimatePresence mode="wait">
              {features.map((feature) =>
                activeTab === feature.id ? (
                  <TabsContent
                    key={feature.id}
                    value={feature.id}
                    className="m-0 h-full"
                  >
                    <m.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="grid h-full lg:grid-cols-2"
                    >
                      <div className="flex flex-col justify-center p-8 text-right lg:p-12">
                        <div className="bg-primary/10 text-primary mb-6 flex h-12 w-12 items-center justify-center rounded-xl">
                          <feature.icon className="h-6 w-6" />
                        </div>
                        <h3 className="mb-4 text-2xl font-bold">
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                          {feature.description}
                        </p>
                        <ul className="space-y-3">
                          {feature.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-center gap-3">
                              <div className="bg-primary h-2 w-2 rounded-full" />
                              <span className="text-muted-foreground">
                                {benefit}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-muted relative h-64 overflow-hidden lg:h-full">
                        <m.img
                          initial={{ scale: 1.1 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.5 }}
                          src={feature.image}
                          alt={feature.title}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                        <div className="from-background/50 absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t to-transparent lg:hidden" />
                      </div>
                    </m.div>
                  </TabsContent>
                ) : null
              )}
            </AnimatePresence>
          </div>
        </Tabs>
      </div>
    </section>
  );
};
