const mongoose = require('mongoose');


const samplePlanet = {
        kepid: '8311864',
        kepoi_name: 'K07016.01',
        kepler_name: 'Kepler-452 b',
        koi_disposition: 'CONFIRMED',
        koi_pdisposition: 'CANDIDATE',
        koi_score: '0.7710',
        koi_fpflag_nt: '0',
        koi_fpflag_ss: '0',
        koi_fpflag_co: '0',
        koi_fpflag_ec: '0',
        koi_period: '384.847556000',
        koi_period_err1: '7.1050000e-03',
        koi_period_err2: '-7.1050000e-03',
        koi_time0bk: '314.9700000',
        koi_time0bk_err1: '1.520000e-02',
        koi_time0bk_err2: '-1.520000e-02',
        koi_impact: '0.0590',
        koi_impact_err1: '0.3870',
        koi_impact_err2: '-0.0590',
        koi_duration: '9.96900',
        koi_duration_err1: '0.44100',
        koi_duration_err2: '-0.44100',
        koi_depth: '1.8990e+02',
        koi_depth_err1: '1.760e+01',
        koi_depth_err2: '-1.760e+01',
        koi_prad: '1.09',
        koi_prad_err1: '2.000e-01',
        koi_prad_err2: '-1.000e-01',
        koi_teq: '220.0',
        koi_teq_err1: '',
        koi_teq_err2: '',
        koi_insol: '0.56',
        koi_insol_err1: '0.32',
        koi_insol_err2: '-0.15',
        koi_model_snr: '12.30',
        koi_tce_plnt_num: '1',
        koi_tce_delivname: 'q1_q17_dr25_tce',
        koi_steff: '5579.00',
        koi_steff_err1: '150.00',
        koi_steff_err2: '-150.00',
        koi_slogg: '4.580',
        koi_slogg_err1: '0.034',
        koi_slogg_err2: '-0.127',
        koi_srad: '0.7980',
        koi_srad_err1: '0.1500',
        koi_srad_err2: '-0.0750',
        ra: '296.003690',
        dec: '44.277561',
        koi_kepmag: '13.426'
}


const planetSchema = new mongoose.Schema(
    {
        keplerName: {
            type: String,
            required: true
        }
    }
);


const planet = mongoose.model('Planet', planetSchema);

module.exports = {
    planet,
};