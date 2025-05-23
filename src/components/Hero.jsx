import { useRef } from "react";
import { ScrollParallax } from "react-just-parallax";

import { curve, heroBackground, group } from "../assets";
import { heroIcons } from "../constants";
import Button from "./Button";
import Section from "./Section";
import Generating from "./Generating";
import Notification from "./Notification";
import CompanyLogos from "./CompanyLogos";
import { BackgroundCircles, BottomLine, Gradient } from "./design/Hero";

const Hero = () => {
  const parallaxRef = useRef(null);

  return (
    <Section
      className="pt-[12rem] -mt-[5.25rem]"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      {/* Top Left Logo */}
      <div className="fixed top-20 left-7 w-80 px-6 py-4 z-50 flex items-center">
        <img
          src="/mailam-logo.png"
          alt="Mailam Engineering College Logo"
          className="w-40 h-auto object-contain"
        />
      </div>

      {/* Main Container */}
      <div className="container relative" ref={parallaxRef}>
        {/* Headings */}
        <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
          <h4 className="h4 mb-2">Department of</h4>
          <h1 className="h1 mb-6 bg-gradient-to-r from-blue-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            ARTIFICIAL INTELLIGENCE AND DATA SCIENCE
          </h1>

          {/* Title with curve */}
          <span className="inline-block relative text-4xl font-bold mb-5">
            DataBrainHub{" "}
            <img
              src={curve}
              className="absolute top-full left-0 w-full xl:-mt-2"
              width={624}
              height={28}
              alt="Curve"
            />
          </span>

          {/* Description */}
          <p className="body-1 max-w-3xl mx-auto mb-6 text-n-2 lg:mb-8">
            Unleash the power of AI&DS within DataBrainHub.
          </p>

          {/* CTA Button */}
          <Button href="/login" white>
            Get started
          </Button>
        </div>

        {/* Hero Image Section */}
        <div className="relative max-w-[23rem] mx-auto md:max-w-5xl xl:mb-24">
          <div className="relative z-1 p-0.5 rounded-2xl bg-conic-gradient">
            <div className="relative bg-n-8 rounded-[1rem]">
              {/* Top bar */}
              <div className="h-[1.4rem] bg-n-10 rounded-t-[0.9rem]" />

              {/* Main Image */}
              <div className="aspect-[33/40] rounded-b-[0.9rem] overflow-hidden md:aspect-[688/490] lg:aspect-[1024/490]">
                <img
                  src={group}
                  className="w-full scale-[1.7] translate-y-[8%] md:scale-[1] md:-translate-y-[10%] lg:-translate-y-[23%]"
                  width={1024}
                  height={490}
                  alt="AI"
                />

                {/* Generating animation */}
                <Generating className="absolute left-4 right-4 bottom-5 md:left-1/2 md:right-auto md:bottom-8 md:w-[31rem] md:-translate-x-1/2" />

                {/* Hero Icons */}
                <ScrollParallax isAbsolutelyPositioned>
                  <ul className="hidden absolute -left-[5.5rem] bottom-[7.5rem] px-1 py-1 bg-n-9/40 backdrop-blur border border-n-1/10 rounded-2xl xl:flex">
                    {heroIcons.map((icon, index) => (
                      <li className="p-5" key={index}>
                        <img src={icon} width={24} height={25} alt={`icon-${index}`} />
                      </li>
                    ))}
                  </ul>
                </ScrollParallax>

                {/* Notification */}
                <ScrollParallax isAbsolutelyPositioned>
                  <Notification
                    className="hidden absolute -right-[5.5rem] bottom-[7rem] w-[18rem] xl:flex"
                    title="Code generation"
                  />
                </ScrollParallax>
              </div>
            </div>

            {/* Gradient Border */}
            <Gradient />
          </div>

          {/* Hero Background */}
          <div className="absolute -top-[54%] left-1/2 w-[234%] -translate-x-1/2 md:-top-[46%] md:w-[138%] lg:-top-[104%]">
            <img
              src={heroBackground}
              className="w-full"
              width={1440}
              height={1800}
              alt="hero"
            />
          </div>

          {/* Background Circles */}
          <BackgroundCircles />
        </div>

        {/* Company Logos */}
        <CompanyLogos className="hidden relative z-10 mt-20 lg:block" />
      </div>

      {/* Bottom Line */}
      <BottomLine />
    </Section>
  );
};

export default Hero;
