import { PessoaPanelComponent } from './pessoa-panel.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';


describe('PessoaPanelComponent', () => {
    let component: PessoaPanelComponent;
    let fixture: ComponentFixture<PessoaPanelComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PessoaPanelComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PessoaPanelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
