'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowUpRight, Phone } from 'lucide-react';
export default function Navbar(){const [open,setOpen]=useState(false);return <header className="ps-nav"><a className="skip-link" href="#main-content">Skip to content</a><Link className="ps-brand" href="/"><img src="/images/logo.png" width="49" height="49" alt="PS Rentals logo"/><span>PS RENTALS<small>HYDERABAD · TWO WHEELS. ENDLESS POSSIBILITIES.</small></span></Link><nav className={open?'nav-links is-open':'nav-links'} aria-label="Main navigation">{[['/#fleet','Our fleet'],['/#how-it-works','How it works'],['/#faq','FAQs'],['/#contact','Contact']].map(([url,label])=><Link key={url} href={url} onClick={()=>setOpen(false)}>{label}</Link>)}</nav><div className="nav-actions"><a className="nav-phone" href="tel:+919985819038"><Phone size={15}/>99858 19038</a><Link href="/booking" className="ps-button dark">Book a ride <ArrowUpRight size={17}/></Link><button className="menu-button" aria-label="Toggle navigation" aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></div></header>}
