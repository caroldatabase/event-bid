app.constant('CONSTANTS',
    {
        ENVIORNMENT :
            {
                WEBUAT: 'http://139.59.63.136/eventbid',
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
            Waiting_Staff : 'Waiting Staff',
            Graphic_Design: 'Graphic Design',
            Supply_Hire: 'Supply Hire',
            Hair_and_Beauty: 'Hair and Beauty',
            Entertainment_and_talent : "Entertainment and talent"
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
                cakeTypes: "Type of cakes required",
                describeReq: "Description of requirement",
                desertType: "Type of desert",
                dietaryRequirement: "Dietary requirement",
                numberOfDesert: "number of desert",
                costType: "Type of cost",
                totalCost: "Total Cost",
                desertImages : "Desert Images for reference"
            },
            Waiting_Staff:
            {
                dressCode: "Dress code required for waiters",
                dressCodeDescription: "Dress code description",
                totalCost: "Total cost",
                totalCostType: "Total cost type ",
                totalWaiter: "Total waiters",
                waitersTask:"Waiters Task"
            },
  
            Graphic_Design: {
                totalBudgetForbanners: "Total budget for banners",
                numberOfBanners: "Number of banners",
                additionalInformation: "Additional Information required",
                designPrinted: "Design printed",
                graphicBanners: "Graphic banners required",
                graphicImages : "Graphic images"
            },
            Supply_Hire: {
                decriptionInDetail: "Description for supplies",
                returnSupplies: "Return description for supplies",
                IscleaningPriceToBeIncluded: "Is cleaning price to be included",
                supplyTypes : "Type of supplies"
            },
            Hair_and_Beauty: {
                hairStyleRequired: "Hair style required",
                location: "Location",
                makeUpTypeRequired: "Make type required",
                needToBring: "Do products need to bring",
                specialRequestsForHairStyle: "Special request for hair style",
                specialRequirement: "Special requirement",
                serviceType: "Type of service",
                hairType: "Hair type",
                graphicImages : "graphic images"
            },
            Entertainment_and_talent: {
                entertainerRequired: "Entertainer required",
                equipmentReadyForTalent: "Equipment reqdy for talent",
                thingsRequiredForTalent : "Things required for talent"
            }
        }
    })