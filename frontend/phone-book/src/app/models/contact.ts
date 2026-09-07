export type ContactType =
  | 'Person'
  | 'PublicOrganization'
  | 'PrivateOrganization';

export interface Contact {
  id: number;
  contactType: ContactType;
  name: string;
  phoneNumber: string;
  comments: string;

  // Campos específicos para Persona
  firstName?: string;
  lastName?: string;

  // Campos específicos para Organización pública
  governmentSector?: string;
  website?: string;

  // Campo específico para Organización privada
  industry?: string;
}

export const CONTACT_TYPES: {
  value: ContactType;
  label: string;
}[] = [
  {
    value: 'Person',
    label: 'Persona'
  },
  {
    value: 'PublicOrganization',
    label: 'Organización pública'
  },
  {
    value: 'PrivateOrganization',
    label: 'Organización privada'
  }
];