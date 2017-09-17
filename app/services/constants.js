app.constant('CONSTANTS',
    {
        ENVIORNMENT :
            {
                WEBUAT: 'http://webpedialab.com/eventbid',
                LOCAL: 'http://localhost/eventBid_webapi'
            },
        ERRORMESSAGE:
            {
                REQUIREDFIELDERROR : 'Please enter required details'
            },
        //CATEGORY:
        //{
        //    CATERING: 22,
        //    CLEANING_SERVICES: 23,
        //    MAKE_UP_HAIR_BEAUTY : 31,
        //    CAR_VENUE_HIRE :20, 
        //    ENTERTAINMENT_TALENT :24,
        //    GRAPHIC_DESIGN :25, 
        //    SUPPLY_HIRE :26,
        //    FLORISTRY :27, 
        //    PHOTOGRAPHY_VIDEOGRAPHY : 28, 
        //    PATISSERIE : 29, 
        //    WAITING_SERVICE : 30
        //}
        CATEGORY:
        {
            Catering: 'Catering',
            Cleaning: 'Cleaning',
            Patisserie: 'Patisserie',
            Catering: 'Catering',
            Catering: 'Catering',
            Catering: 'Catering',
        },
        CATEGORY_QUESTIONS :
        {
            Catering:
            {
                cateringType: 'Catering Type',
                mealType: 'Meal Type',
                drinkType: 'Drink type served to guests',
                menuRequests: 'Menu Request',
                waitingRequire : 'Waiting Service required',
                dietaryRequirement: 'Dietary requirement',
                totalGuest: 'Total Guests',
                totalCost: 'Cost(in $)',
                costType: 'Type of Cost',
                
            },
            Cleaning :
            {
                    cleanersNeeded: 'Number of cleaners needed',
                    cleaningChecklist: 'Cleaning type',
                    equipmentRequired: 'Equipments required for cleaning',
                    timeRequired: 'Time Required(in hrs)',
                    waitingRequire: 'Waiting Service required',
                    totalCost: 'Cost(in $)',
                    costType: 'Type of Cost',
            },
            Patisserie :
            {

            },
            'Waiting Staff' :
            {

            },
  


        }
    })