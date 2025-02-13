# **Angular 2+ DOM Manipulation**  

## **Introduction**  
In Angular 2+, direct DOM manipulation is discouraged because Angular provides **Directives, Template Syntax, ViewChild, Renderer2, and HostListener** to interact with the DOM efficiently. However, there are cases where you might need to manipulate the DOM directly.  

This covers:  
1. **Basic DOM Binding & Event Handling**  
2. **Using `@ViewChild` for DOM Access**  
3. **Using `Renderer2` for Safe DOM Manipulation**  
4. **Custom Directives for DOM Manipulation**  
5. **Dynamically Creating Components**  

---

## **1. Basic DOM Binding & Event Handling**  
Angular provides **Property Binding**, **Event Binding**, and **Two-way Binding** to interact with the DOM.  

### **a) Property Binding (`[property]`)**  
Bind an element property dynamically.  

```html
<input [value]="message">
<p>{{ message }}</p>
```
```typescript
export class AppComponent {
  message = "Hello, Angular!";
}
```

### **b) Event Binding (`(event)`)**  
Bind an event like `click` to a method in the component.  

```html
<button (click)="changeText()">Click Me</button>
<p>{{ message }}</p>
```
```typescript
export class AppComponent {
  message = "Hello!";
  
  changeText() {
    this.message = "You clicked the button!";
  }
}
```

### **c) Two-Way Data Binding (`[(ngModel)]`)**  
Requires `FormsModule` in `app.module.ts`.  

```html
<input [(ngModel)]="message">
<p>{{ message }}</p>
```
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  message = "Type something!";
}
```

---

## **2. Using `@ViewChild` for DOM Access**  
Use `@ViewChild` to get a reference to an element and modify it dynamically.  

```html
<p #textElement>This text will change!</p>
<button (click)="changeText()">Change Text</button>
```
```typescript
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  @ViewChild('textElement') textElement!: ElementRef;

  changeText() {
    this.textElement.nativeElement.innerText = "Text has been changed!";
  }
}
```

---

## **3. Using `Renderer2` for Safe DOM Manipulation**  
Angular discourages direct `nativeElement` manipulation. Use **Renderer2** to modify elements safely.  

```html
<p #textElement>This is a paragraph.</p>
<button (click)="changeColor()">Change Color</button>
```
```typescript
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  @ViewChild('textElement') textElement!: ElementRef;

  constructor(private renderer: Renderer2) {}

  changeColor() {
    this.renderer.setStyle(this.textElement.nativeElement, 'color', 'blue');
  }
}
```

---

## **4. Custom Directives for DOM Manipulation**  
Create a directive to change background color when an element is clicked.  

### **Directive:**
```typescript
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  constructor(private el: ElementRef) {}

  @HostListener('click') onClick() {
    this.el.nativeElement.style.backgroundColor = 'yellow';
  }
}
```

### **Usage in Template:**
```html
<p appHighlight>Click me to highlight!</p>
```

---

## **5. Dynamically Creating Components**  
Use `ComponentFactoryResolver` to create components dynamically.  

### **Dynamic Component**
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-dynamic',
  template: `<p>Dynamically Created Component!</p>`,
  styles: [`p { color: green; }`]
})
export class DynamicComponent {}
```

### **Host Component**
```html
<button (click)="loadComponent()">Load Component</button>
<div #container></div>
```

### **Dynamic Component Loader**
```typescript
import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { DynamicComponent } from './dynamic.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  @ViewChild('container', { read: ViewContainerRef }) container!: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver) {}

  loadComponent() {
    const factory = this.resolver.resolveComponentFactory(DynamicComponent);
    this.container.clear();
    this.container.createComponent(factory);
  }
}
```

---

## **Conclusion**  
- Use **Property Binding, Event Binding, and Two-way Binding** for basic DOM manipulation.  
- Use **@ViewChild** to access DOM elements directly.  
- Use **Renderer2** for safe DOM modifications.  
- Create **Custom Directives** for reusability.  
- Use **ComponentFactoryResolver** for dynamic components.  
