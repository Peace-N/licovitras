import {Component, OnInit, DoCheck, KeyValueDiffers, HostListener} from '@angular/core';
import {RestService} from '../rest.service';
import {LoadingController} from '@ionic/angular';
import 'snapsvg-cjs';

declare const Snap: any;
declare var mina: any;

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit, DoCheck
{
    countries: any = [];
    currentState: any = [];
    differ: any;
    private loader: HTMLIonLoadingElement;
    private loaderLoading = false;


    constructor(private differs: KeyValueDiffers, public restProvider: RestService, public loading: LoadingController) {
        this.presentLoading('Please wait ..');
        this.listCountries();
        this.differ = this.differs.find({}).create();
    }

    ngOnInit() {
        //this.mapRendering();
    }

    ngDoCheck() {
        const change = this.differ.diff(this);
        if (change) {
            change.forEachChangedItem(item => {
                console.log(item.key);
                if(item.key === 'countries') {
                    this.mapRendering();
                }
            });
        }
    }

    public listCountries() {
        this.restProvider.getCountries().subscribe(
            data => {
                this.countries = data;
                console.log(this.countries, this.countries.length);
                if (this.countries) {
                    this.dismissLoading();
                }
            },
            error => {
                this.dismissLoading();
            }
        );
    }

    public presentLoading(message: string) {
        this.loaderLoading = true;
        this.loading.create({
            message,
            showBackdrop: true
        }).then(load => {
            this.loader = load;
            load.present().then(() => { this.loaderLoading = false; });
        });
    }

    public dismissLoading() {
        const interval = setInterval(() => {
            if (this.loader || !this.loaderLoading) {
                this.loader.dismiss().then(() => { this.loader = null; clearInterval(interval); });
            } else if (!this.loader && !this.loaderLoading) {
                clearInterval(interval);
            }
        }, 500);
    }

    mapRendering() {
        const s = Snap('#megatron');
        const lesotho = s.select('#LS');
        const e_cape = s.select('#ZA-EC');
        const f_state = s.select('#ZA-FS');
        const gauteng = s.select('#ZA-GT');
        const limpopo = s.select('#ZA-LP');
        const mpumalanga = s.select('#ZA-MP');
        const n_cape = s.select('#ZA-NC');
        const k_natal = s.select('#ZA-NL');
        const n_west = s.select('#ZA-NW');
        const w_cape = s.select('#ZA-WC');

        // begin atributes
        lesotho.attr('fill', 'white');
        gauteng.attr('fill', 'gold');
        e_cape.attr('fill', 'gold');
        f_state.attr('fill', 'gold');
        limpopo.attr('fill', 'gold');
        mpumalanga.attr('fill', 'gold');
        n_cape.attr('fill', 'gold');
        k_natal.attr('fill', 'gold');
        n_west.attr('fill', 'gold');
        w_cape.attr('fill', 'gold');

        const nc = s.paper.text(50, 220, 'NORTHERN CAPE');
        const wc = s.paper.text(50, 330, 'WESTERN CAPE');
        const ec = s.paper.text(230, 280, 'EASTERN CAPE');
        const gp = s.paper.text(250, 120, 'GAUTENG');
        const fs = s.paper.text(230, 180, 'FREE STATE');
        const kzn = s.paper.text(350, 200, 'KZN');
        const mp = s.paper.text(320, 140, 'MPUMALANGA');
        const nw = s.paper.text(190, 90, 'NORTH WEST');
        const lp = s.paper.text(300, 50, 'LIMPOPO');

        const ncc = s.circle(50, 230, 20);
        const wcc = s.circle(50, 340, 20);
        const ecc = s.circle(230, 300, 20);
        const gcc = s.circle(275, 130, 20);
        const fcc = s.circle(240, 190, 20);
        const kcc = s.circle(350, 210, 20);
        const mcc = s.circle(320, 150, 20);
        const nwc = s.circle(200, 110, 20);
        const lpc = s.circle(300, 60, 20);

        console.log(this.coloGeneratorAlgorithim(500));

        let nccColor = this.coloGeneratorAlgorithim(parseInt(this.countries.regional.northern_cape));

        console.log("NCC Color", nccColor);

        if (this.countries) {

            ncc.attr({
                fill: nccColor,
                opacity: 0.8,
                stroke: '#ffffff'
            });
        wcc.attr({
                fill: this.coloGeneratorAlgorithim(parseInt(this.countries.regional.western_cape)),
                opacity: 0.8,
                stroke: '#ffffff'
            });
        ecc.attr({
                fill: this.coloGeneratorAlgorithim(parseInt(this.countries.regional.eastern_cape)),
                opacity: 0.8,
                stroke: '#ffffff'
            });
        gcc.attr({
                fill: this.coloGeneratorAlgorithim(parseInt(this.countries.regional.gauteng)),
                opacity: 0.8,
                stroke: '#ffffff'
            });
        fcc.attr({
                fill: this.coloGeneratorAlgorithim(parseInt(this.countries.regional.free_state)),
                opacity: 0.8,
                stroke: '#ffffff'
            });
        kcc.attr({
                fill: this.coloGeneratorAlgorithim(parseInt(this.countries.regional.kzn)),
                opacity: 0.8,
                stroke: '#ffffff'
            });
        mcc.attr({
                fill: this.coloGeneratorAlgorithim(parseInt(this.countries.regional.mpumalanga)),
                opacity: 0.8,
                stroke: '#ffffff'
            });
        nwc.attr({
                fill: this.coloGeneratorAlgorithim(parseInt(this.countries.regional.north_west)),
                opacity: 0.8,
                stroke: '#ffffff'
            });
        lpc.attr({
                fill: this.coloGeneratorAlgorithim(parseInt(this.countries.regional.limpopo)),
                opacity: 0.8,
                stroke: '#ffffff'
            });
        }
    }

    // tslint:disable-next-line:variable-name
    public coloGeneratorAlgorithim(number) {

        if (number <= 300) {
            return '#b4ff00';
        }

        if (number <= 500 && number > 300) {
            return 'orange';
        }

        if (number > 500 && number <= 1000) {
            return 'orangered';
        }

        if (number > 1000) {
            return 'red';
        }
    }

}
