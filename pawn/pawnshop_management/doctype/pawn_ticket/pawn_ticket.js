// Copyright (c) 2021, SERVIO Technologies and contributors
// For license information, please see license.txt

frappe.ui.form.on('Pawn Ticket', {
    refresh: function(frm) {
        frm.set_query('pawn_item', 'pawn_ticket_items', function() {
            return {
                'filters': {
                    'pawn_type': frm.doc.pawn_type
                }
            };
        });
    },

    date_loan_granted: function(frm) {
        let default_maturity_date = frappe.datetime.add_days(cur_frm.doc.date_loan_granted, 30);
        cur_frm.set_value('maturity_date', default_maturity_date);

        let default_expiry_date = frappe.datetime.add_days(cur_frm.doc.date_loan_granted, 120);
        cur_frm.set_value('expiry_date', default_expiry_date);
    },

    set_totals: function(frm) {
        let temp_principal = 0.00;
        $.each(frm.doc.pawn_ticket_items, function(index, item) {
            temp_principal += parseFloat(item.appraised_amount);
        });
        frm.set_value('principal', temp_principal);
        frappe.show_alert("Principal updated");
        // interest

        frappe.db.get_single_value('Pawnshop Management Settings', 'jewelry_interest_rate').then(value => {
            let temp_interest = (parseFloat(value) / 100) * temp_principal;
            frm.set_value('interest', temp_interest);

            let net_proceeds = temp_principal - temp_interest;
            frm.set_value('net_proceeds', net_proceeds);
        });
    }
});

frappe.ui.form.on('Pawn Ticket Item', {
    appraised_amount: function(frm, cdt, cdn) {
        frm.trigger('set_totals');
    },

    pawn_ticket_items_remove: function(frm) {
        frm.trigger('set_totals');
    }
});