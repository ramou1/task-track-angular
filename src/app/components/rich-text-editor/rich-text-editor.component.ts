import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, forwardRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NbButtonModule, NbIconModule } from '@nebular/theme';

@Component({
  selector: 'app-rich-text-editor',
  standalone: true,
  imports: [CommonModule, NbButtonModule, NbIconModule],
  templateUrl: './rich-text-editor.component.html',
  styleUrl: './rich-text-editor.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RichTextEditorComponent),
      multi: true,
    },
  ],
})
export class RichTextEditorComponent implements ControlValueAccessor, AfterViewInit {
  @ViewChild('area') private area?: ElementRef<HTMLDivElement>;

  disabled = false;
  private pending = '';
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  ngAfterViewInit(): void {
    if (this.area && this.pending) {
      this.area.nativeElement.innerHTML = this.pending;
    }
  }

  writeValue(value: string | null): void {
    const html = value || '';
    this.pending = html;
    if (this.area) {
      this.area.nativeElement.innerHTML = html;
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  format(command: string): void {
    document.execCommand(command, false);
    this.emit();
  }

  insertImage(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    (event.target as HTMLInputElement).value = '';
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      document.execCommand('insertHTML', false, `<img src="${reader.result}" alt="Imagem da tarefa">`);
      this.emit();
    };
    reader.readAsDataURL(file);
  }

  onInput(): void {
    this.emit();
  }

  markTouched(): void {
    this.onTouched();
  }

  private emit(): void {
    const html = this.area?.nativeElement.innerHTML || '';
    this.onChange(html === '<br>' ? '' : html);
  }
}
