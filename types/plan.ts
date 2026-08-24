/** Un plan/servicio del catalogo. `id` es el slug usado en /planes/[id]. */
export interface Plan {
  id: string;
  name: string;
  /** Precio en MXN, sin IVA. */
  price: number;
  image: string;
  /** Texto introductorio opcional que antecede a la lista de entregables. */
  intro: string;
  /** Entregables. Admite `**negritas**` en linea. */
  features: string[];
  sectionId: string;
  sectionTitle: string;
  groupId: string;
  /** Titulo corto del grupo, ej. "Guion publicitario". */
  groupTitle: string;
  /** Titulo completo del grupo, ej. "SECCION 2: Guion publicitario". */
  groupLabel: string;
}

/** Subcategoria dentro de una seccion (agrupa 3-5 planes). */
export interface PlanGroup {
  id: string;
  title: string;
  label: string;
  planIds: string[];
}

/** Bloque principal del catalogo: preproduccion, produccion o postproduccion. */
export interface PlanSection {
  id: string;
  title: string;
  groups: PlanGroup[];
}
