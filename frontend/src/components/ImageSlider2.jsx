import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import { assets } from "../assets/assets";

const ImageSlider2 = () => {
    return (
        <>
            <HorizontalScrollCarousel />
        </>
    );
};

const HorizontalScrollCarousel = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

    return (
        <section ref={targetRef} className="relative h-[400vh]">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <motion.div style={{ x }} className="flex gap-4">
                    {cards.map((card) => {
                        return <Card card={card} key={card.id} />;
                    })}
                </motion.div>
            </div>
        </section>
    );
};

const Card = ({ card }) => {
    return (
        <div
            key={card.id}
            className="group relative h-[450px] w-[450px] overflow-hidden bg-neutral-200"
        >
            <div
                style={{
                    backgroundImage: `url(${card.url})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
                className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
            ></div>

        </div>
    );
};

export default ImageSlider2;

const cards = [

    {
        url: `${assets.slider1}`,
        id: 1,
    },

    {
        url: `${assets.slider3}`,
        id: 2,
    },
    {
        url: `${assets.slider4}`,
        id: 3,
    },
    {
        url: `${assets.height_4}`,
        title: "Title 4",
        id: 4,
    },
    {
        url: `${assets.height_5}`,
        title: "Title 5",
        id: 5,
    },
    {
        url: `${assets.height_6}`,
        title: "Title 6",
        id: 6,
    },
    // {
    //     url: "https://images.pexels.com/photos/302743/pexels-photo-302743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    //     title: "Title 7",
    //     id: 7,
    // },
];