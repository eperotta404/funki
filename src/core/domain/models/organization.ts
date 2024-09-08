interface Squad {
  name: string;
  logo: string;
}

export class Organization {
  id: string;

  country: string;

  name: string;

  squads: Squad[];

  logo: string;

  constructor(id: string, country: string, name: string, squads: Squad[]) {
    this.id = id;
    this.country = country;
    this.name = name;
    this.squads = squads;
    this.logo = this.getOrganizationLogo();
  }

  private getOrganizationLogo(): string {
    return this.squads.length > 0 ? this.squads[0].logo : '';
  }
}

