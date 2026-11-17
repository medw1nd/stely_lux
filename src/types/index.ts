import React from 'react';

export interface ServiceFeature {
  icon: React.ElementType;
  title: string;
  description: string;
}

export interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  presentation?: { brightness: number; position: string };
}

export interface CalculatorState {
  area: number;
  corners: number;
  lights: number;
  type: 'matte' | 'glossy' | 'satin';
}

export const PRICE_PER_M2 = {
  matte: 350,
  glossy: 380,
  satin: 400
};

export const PRICE_PER_CORNER = 100;
export const PRICE_PER_LIGHT = 200;
