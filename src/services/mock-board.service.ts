import { Injectable, computed, signal } from '@angular/core';
import { DEFAULT_BOARD_ID } from '../app/constants/routes.const';
import { MOCK_BOARDS } from '../app/constants/mock.const';
import { BoardModel } from '../app/models/board-model';

const STORAGE_KEY = 'tasktrack.board';

const BOARD_PRESETS = [
  { color: '#323259', icon: 'briefcase-outline' },
  { color: '#9d50dd', icon: 'color-palette-outline' },
  { color: '#fdab3d', icon: 'bulb-outline' },
  { color: '#579bfc', icon: 'globe-outline' },
  { color: '#00c875', icon: 'home-outline' },
];

@Injectable({
  providedIn: 'root',
})
export class MockBoardService {
  private readonly boardsState = signal<BoardModel[]>(MOCK_BOARDS.map((board) => ({ ...board })));
  private readonly currentId = signal(this.read());

  readonly boards = this.boardsState.asReadonly();
  readonly currentBoardId = this.currentId.asReadonly();
  readonly currentBoard = computed(() => this.byId(this.currentId()) || this.boardsState()[0]);

  byId(id?: string | null): BoardModel | undefined {
    return this.boardsState().find((board) => board.id === id);
  }

  setCurrent(id: string): void {
    const board = this.byId(id) || this.boardsState()[0];
    this.currentId.set(board.id);
    localStorage.setItem(STORAGE_KEY, board.id);
  }

  addBoard(name: string): BoardModel {
    const preset = BOARD_PRESETS[this.boardsState().length % BOARD_PRESETS.length];
    const board: BoardModel = {
      id: `quadro-${Date.now()}`,
      name: name.trim(),
      company: name.trim(),
      description: 'Quadro criado nesta sessão.',
      color: preset.color,
      icon: preset.icon,
    };

    this.boardsState.update((list) => [...list, board]);
    return board;
  }

  private read(): string {
    const stored = localStorage.getItem(STORAGE_KEY);
    return this.byId(stored)?.id || DEFAULT_BOARD_ID;
  }
}
