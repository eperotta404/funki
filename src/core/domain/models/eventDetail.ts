export class EventDetail {
  code: string;

  stadium: string;

  date: string;

  status: string;

  home: string;

  away: string;

  constructor(code: string, stadium: string, date: string, expired: boolean, enabled: boolean, home: string, away: string) {
    this.code = code;
    this.stadium = stadium || 'Stadium';
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
