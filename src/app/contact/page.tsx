"use client";

import React, { JSX, useState, useRef } from "react";
import styles from "./style.module.scss";
import { ReactLenis } from "lenis/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
    gsap.registerPlugin(SplitText, useGSAP);
}

interface FormData {
    name: string;
    email: string;
    service: string;
    message: string;
}

export default function Contact(): JSX.Element {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        service: "",
        message: "",
    });

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [submitStatus, setSubmitStatus] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const container = containerRef.current;
        if (!container) return;
        const splitLines = new SplitText(`.${styles.heading}`, {
            type: "lines",
            linesClass: "split-parent"
        });
        
        const splitChars = new SplitText(splitLines.lines, {
            type: "chars",
            charsClass: "split-child"
        });

        const tl = gsap.timeline({ delay: 0.5 });
        tl.from(splitChars.chars, {
            yPercent: 100,
            duration: 0.8,
            stagger: 0.02,
            ease: "power4.out",
        });

        tl.from(container.querySelectorAll(`.${styles.formGroup}`), {
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
        }, "-=0.5");

        tl.from(container.querySelector(`.${styles.submitButton}`), {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
        }, "-=0.5");

        return () => {
            splitChars.revert();
            splitLines.revert();
        };
    }, { scope: containerRef });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();

        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Response:", data);
            setSubmitStatus("Message sent successfully!");

            setFormData({
                name: "",
                email: "",
                service: "",
                message: "",
            });
        } catch (error: unknown) {
            console.error("Form submission error:", error);
            setSubmitStatus("Failed to send message. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <ReactLenis root>
            <div className={styles.contactContainer} ref={containerRef}>
                <h1 className={styles.heading}>
                    Get in Touch
                </h1>

                <div className={styles.contactContent}>
                    <div className={styles.formContainer}>
                        <form onSubmit={handleSubmit} className={styles.contactForm}>
                            <div className={styles.formGroup}>
                                <label htmlFor="name">Your name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    required
                                />
                                <div className={styles.inputLine}></div>
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="email">Your Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    required
                                />
                                <div className={styles.inputLine}></div>
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="service">Service you are looking for</label>
                                <input
                                    type="text"
                                    id="service"
                                    name="service"
                                    value={formData.service}
                                    onChange={handleChange}
                                    placeholder="Enter the service you need"
                                    required
                                />
                                <div className={styles.inputLine}></div>
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Enter your message"
                                    rows={4}
                                    required
                                ></textarea>
                                <div className={styles.inputLine}></div>
                            </div>

                            <button
                                type="submit"
                                className={styles.submitButton}
                                disabled={isSubmitting}
                            >
                                <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M5 12H19M19 12L13 6M19 12L13 18"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>

                            {submitStatus && (
                                <div
                                    className={`${styles.statusMessage} ${
                                        submitStatus.includes("Failed")
                                            ? styles.errorMessage
                                            : styles.successMessage
                                    }`}
                                >
                                    {submitStatus}
                                </div>
                            )}
                        </form>
                    </div>

                </div>
            </div>
        </ReactLenis>
    );
}
