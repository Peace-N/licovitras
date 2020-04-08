import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Age16Page } from './age16.page';

describe('Age16Page', () => {
  let component: Age16Page;
  let fixture: ComponentFixture<Age16Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Age16Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Age16Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
