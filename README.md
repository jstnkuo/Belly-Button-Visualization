# Belly-Button-Visualization

This project creates an interactive dashboard by utilizing D3 and plotly to visualize and explore the Belly Button Biodiversity dataset which catalogs the microbes that colonize human navels.

The init() function is called when the page first loads and sets the initial subject ID to the first ID in the dataset. It then calls the bar_chart(), bubble_chart(), and metadata_info() functions to display the corresponding charts and information for that subject.

The bar_chart() function creates a horizontal bar chart that displays the top 10 operational taxonomic units (OTUs) found in the subject's belly button sample. The bubble_chart() function creates a bubble chart that displays all of the OTUs found in the subject's sample, with the size of each bubble corresponding to the amount of that OTU found in the sample. The metadata_info() function displays demographic information about the subject, such as their age, gender, and ethnicity.




