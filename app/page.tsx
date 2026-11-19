"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CalendarDays, Camera, ChevronDown, Clock3, MapPin, Phone, Scissors, X } from "lucide-react";
import "react-day-picker/style.css";

const services = [
  { name: "Skin Fade", category: "HAIRCUT FADE", price: "$20", duration: "30 min" },
  { name: "Haircut + Beard Trim + Hot Towel", category: "HAIRCUT & BEARD", price: "$35", duration: "45 min" },
  { name: "Beard Trimming & Shaping + Hot Towel", category: "BEARD TRIM", price: "$15", duration: "30 min" },
  { name: "Kids Haircut", category: "AGES UNDER 12", price: "$15", duration: "30 min" },
  { name: "Seniors Haircut", category: "AGES 65+", price: "$15", duration: "30 min" },
  { name: "Steam Machine + Skin Care Creams", category: "FACIAL CLEANING", price: "$15", duration: "30 min" },
  { name: "Nose, Ears & Face", category: "NOSE, EAR & FACE WAX", price: "$10", duration: "15 min" },
  { name: "Shampoo + Hot Oil / Conditioner", category: "HAIR WASH & CONDITIONING", price: "$5", duration: "5 min" },
];

const hours = [
  ["Monday", "9 AM – 6 PM"], ["Tuesday", "Closed"], ["Wednesday", "9 AM – 6 PM"],
  ["Thursday", "9 AM – 7 PM"], ["Friday", "9 AM – 7 PM"], ["Saturday", "9 AM – 7 PM"],
  ["Sunday", "11 AM – 7 PM"],
];

const bookingSchema = z.object({
  service: z.string().min(1, "Choose a service"),
  name: z.string().min(2, "Enter your name"),
  phone: z.string().min(10, "Enter a valid phone number"),
  email: z.email("Enter a valid email"),
  time: z.string().min(1, "Choose a time"),
});

type BookingValues = z.infer<typeof bookingSchema>;

export default function Home() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [date, setDate] = useState<Date>();
  const [confirmed, setConfirmed] = useState(false);
  const [dateError, setDateError] = useState(false);
  const form = useForm<BookingValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { service: "", name: "", phone: "", email: "", time: "" },
  });

  const openBooking = (service = "") => {
    form.reset({ service, name: "", phone: "", email: "", time: "" });
    setDate(undefined);
    setDateError(false);
    setConfirmed(false);
    setBookingOpen(true);
  };

  const submitBooking = () => {
    if (!date) {
      setDateError(true);
      return;
    }
    setConfirmed(true);
  };

  return (
    <main>
      <header className="nav-shell">
        <a className="brand" href="#top" aria-label="Uptown Barber Shop home">
          <span className="brand-mark"><Scissors size={21} strokeWidth={1.7} /></span>
          <span><strong>UPTOWN</strong><small>BARBER SHOP</small></span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#services">Services</a><a href="#about">About</a>
          <a href="#hours">Hours</a><a href="#contact">Contact</a>
        </nav>
        <button className="nav-cta" onClick={() => openBooking()}><CalendarDays size={17} /> Book appointment</button>
      </header>

      <section className="hero" id="top">
        <div className="hero-noise" />
        <div className="hero-content">
          <p className="eyebrow"><span /> Windsor&apos;s neighbourhood barbershop</p>
          <h1>Sharp cuts.<br /><em>Classic service.</em></h1>
          <p className="hero-copy">A modern barbershop for men and kids, dedicated to quality cuts, clean fades, and a comfortable experience.</p>
          <div className="hero-actions">
            <button className="primary-button" onClick={() => openBooking()}>Book an appointment <ChevronDown size={16} /></button>
            <a className="text-button" href="#services">View services <span>→</span></a>
          </div>
        </div>
        <div className="hero-card">
          <span>OPEN TODAY</span><strong>9:00 AM — 6:00 PM</strong>
          <a href="tel:+12262601074"><Phone size={15} /> 226-260-1074</a>
        </div>
      </section>

      <section className="services-section" id="services">
        <div className="section-heading">
          <div><p className="eyebrow dark"><span /> Our services</p><h2>Look sharp.<br />Feel confident.</h2></div>
          <p>From clean fades to full-service grooming, every detail is handled with care.</p>
        </div>
        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.category}>
              <div className="service-top"><span>{service.category}</span><strong>{service.price}</strong></div>
              <h3>{service.name}</h3>
              <div className="service-bottom">
                <span><Clock3 size={14} /> {service.duration}</span>
                <button onClick={() => openBooking(service.category)} aria-label={`Book ${service.category}`}>Book <span>→</span></button>
              </div>
            </article>
          ))}
        </div>
        <div className="full-service">
          <div><p>THE COMPLETE EXPERIENCE</p><h3>Full Service</h3><span>Haircut + Beard Trim + Hot Towel + Facial Cleaning + Hair Wash &amp; Conditioning</span></div>
          <div className="full-service-price"><strong>$55</strong><button onClick={() => openBooking("FULL SERVICE")}>Book full service</button></div>
        </div>
      </section>

      <section className="about-section" id="about">
        <div className="about-art"><div className="barber-pole"><span /><span /><span /></div><div className="monogram">US</div></div>
        <div className="about-copy">
          <p className="eyebrow dark"><span /> About Uptown</p><h2>Good cuts start with<br />good people.</h2>
          <p>Uptown Barber Shop is a modern and welcoming barbershop in Windsor, Ontario. We provide professional haircuts and grooming for men, kids, and seniors at affordable prices.</p>
          <p>Our focus is simple: quality, customer satisfaction, and a comfortable experience every time you visit.</p>
          <a href="https://instagram.com/uptown.barber.shop" target="_blank" rel="noreferrer"><Camera size={17} /> @uptown.barber.shop</a>
        </div>
      </section>

      <section className="visit-section" id="hours">
        <div className="hours-card" id="contact">
          <p className="eyebrow"><span /> Visit us</p><h2>Come on in.</h2>
          <div className="hours-list">{hours.map(([day, time]) => <div key={day}><span>{day}</span><strong className={time === "Closed" ? "closed" : ""}>{time}</strong></div>)}</div>
        </div>
        <div className="location-card">
          <div className="map-pattern" />
          <div className="location-info"><MapPin size={20} /><div><strong>38 Shepherd St E</strong><span>Windsor, ON N8X 2J8</span></div><a href="https://maps.google.com/?q=38+Shepherd+St+E,+Windsor,+ON" target="_blank" rel="noreferrer">Get directions →</a></div>
        </div>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top"><span className="brand-mark"><Scissors size={21} strokeWidth={1.7} /></span><span><strong>UPTOWN</strong><small>BARBER SHOP</small></span></a>
        <p>Professional cuts for men and kids.</p>
        <a href="tel:+12262601074"><Phone size={15} /> 226-260-1074</a>
      </footer>

      {bookingOpen && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="booking-title">
          <div className="booking-modal">
            <button className="modal-close" onClick={() => setBookingOpen(false)} aria-label="Close booking form"><X size={20} /></button>
            {confirmed ? (
              <div className="confirmation">
                <span className="confirmation-mark">✓</span><p className="eyebrow dark"><span /> Request received</p>
                <h2 id="booking-title">You&apos;re all set!</h2><p>We&apos;ll confirm your appointment details shortly.</p>
                <button className="primary-button" onClick={() => setBookingOpen(false)}>Done</button>
              </div>
            ) : (
              <>
                <p className="eyebrow dark"><span /> Appointment request</p><h2 id="booking-title">Book your cut</h2>
                <form onSubmit={form.handleSubmit(submitBooking)}>
                  <label>Service
                    <select {...form.register("service")}><option value="">Choose a service</option>{services.map((service) => <option key={service.category} value={service.category}>{service.category} — {service.price}</option>)}<option value="FULL SERVICE">FULL SERVICE — $55</option></select>
                    {form.formState.errors.service && <small>{form.formState.errors.service.message}</small>}
                  </label>
                  <div className="form-row">
                    <label>Name<input {...form.register("name")} placeholder="Your name" />{form.formState.errors.name && <small>{form.formState.errors.name.message}</small>}</label>
                    <label>Phone<input {...form.register("phone")} placeholder="226-000-0000" />{form.formState.errors.phone && <small>{form.formState.errors.phone.message}</small>}</label>
                  </div>
                  <label>Email<input {...form.register("email")} type="email" placeholder="you@example.com" />{form.formState.errors.email && <small>{form.formState.errors.email.message}</small>}</label>
                  <div className="booking-grid">
                    <div><span className="field-label">Preferred date</span><DayPicker mode="single" selected={date} onSelect={(selectedDate) => { setDate(selectedDate); setDateError(false); }} disabled={{ before: new Date(), dayOfWeek: [2] }} />{dateError && <small>Choose a date</small>}</div>
                    <label>Time<select {...form.register("time")}><option value="">Choose time</option>{["9:00 AM","10:00 AM","11:00 AM","12:00 PM","1:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM","6:00 PM"].map((time) => <option key={time}>{time}</option>)}</select>{form.formState.errors.time && <small>{form.formState.errors.time.message}</small>}</label>
                  </div>
                  <button className="primary-button submit-button" type="submit">Request appointment</button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
