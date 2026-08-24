import LangSwitcher from '@/components/LangSwitcher';
import { CartProvider } from '@/context/cart-context';
import { LocaleProvider } from '@/context/lang-context';
import { routing } from '@/i18n/routing';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import React from 'react';
import { Toaster } from "sonner";
import ClientBody from './ClientBody';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { Metadata } from 'next';
import { CartDrawer } from '@/components/cart/cart-drawer';


export const metadata: Metadata = {
  title: "Marca Visible — Estrategia y Concepto Creativo Digital",
  description:
    "Producción audiovisual profesional adaptada al entorno digital: video marketing, animación y contenido visual para publicidad.",
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // ESPERAR PARAMS (Next.js 15 Sync Dynamic APIs Fix)
  const { locale } = await params;

  // Validar que el idioma existe en nuestra config
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Carga de mensajes
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <ClientBody>
        <LocaleProvider>
          <CartProvider>
            <SiteHeader />
            {children}
            <SiteFooter />
            <CartDrawer />
            <Toaster />
          </CartProvider>
        </LocaleProvider>
      </ClientBody>
    </NextIntlClientProvider>
  );
}