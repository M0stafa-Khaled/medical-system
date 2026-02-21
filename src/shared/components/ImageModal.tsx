import { Button } from "@/shared/components/ui/button";
import { IoCloseOutline } from "react-icons/io5";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ImageModalProps {
  src: string;
  alt: string;
  className?: string;
  trigger?: React.ReactNode;
  showThumbnail?: boolean;
}

const ImageModal = ({
  src,
  alt,
  className = "",
  trigger,
  showThumbnail = true,
}: ImageModalProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      {trigger ? (
        <div onClick={() => setShowModal(true)}>{trigger}</div>
      ) : (
        showThumbnail && (
          <img
            src={src}
            alt={alt}
            onClick={() => setShowModal(true)}
            className={`border-muted h-full w-full max-w-75 cursor-pointer rounded-md border bg-white/60 object-contain transition-all duration-300 hover:opacity-90 ${className}`}
          />
        )
      )}

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/80"
            onClick={() => setShowModal(false)}
          >
            <div className="flex h-full cursor-pointer items-center justify-center md:p-4">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-full max-w-md p-4"
              >
                <motion.div
                  layoutId={`image-${src}`}
                  className="border-muted relative overflow-hidden rounded-md border dark:border-white/30"
                >
                  <Button
                    variant={"ghost"}
                    className="absolute top-2 right-2 flex h-9 w-9 items-center justify-center bg-white/40 hover:bg-white/70 dark:bg-black/40 dark:hover:bg-black/70"
                    onClick={() => setShowModal(false)}
                  >
                    <IoCloseOutline size={24} className="h-6! w-6!" />
                  </Button>

                  <motion.img
                    src={src}
                    alt=""
                    className="h-full w-full object-contain"
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ImageModal;
