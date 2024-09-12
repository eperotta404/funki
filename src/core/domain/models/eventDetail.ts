export class EventDetail {
  code: string;

  descripcion: string;

  stadium: string;

  type: string;

  date: string;

  status: string;

  home: string;

  away: string;

  constructor(code: string, detail: string, stadium: string, type: string, date: string, expired: boolean, enabled: boolean, home: string, away: string) {
    this.code = code;
    this.descripcion = detail;
    this.stadium = stadium || 'Stadium';
    this.type = type;
    this.date = date;
    this.status = this.determineStatus(expired, enabled);
    this.home = home || 'Home';
    this.away = away || 'Away';
  }


  private determineStatus(expired: boolean, enabled: boolean): string {
    if (enabled && !expired) {
      return 'Por jugar';
    }
    if (enabled && expired) {
      return 'Jugado';
    }
    if (!enabled) {
      return 'Inactivo';
    }
    return 'Desconocido';
  }
}
