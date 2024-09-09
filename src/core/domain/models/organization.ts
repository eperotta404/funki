import { CONFIG } from "src/config-global";

interface Squad {
  id: string;
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
    this.logo = `${CONFIG.assetsDir}/assets/icons/workspaces/logo-1.webp`;
  }
}

