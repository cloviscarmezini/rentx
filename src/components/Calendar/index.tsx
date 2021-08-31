import React from 'react';

import { Feather } from '@expo/vector-icons';

import { useTheme } from 'styled-components';

import { 
    Calendar as CustomCalendar,
    DateCallbackHandler,
    LocaleConfig
} from 'react-native-calendars';

import { generateInterval } from './generateInterval';
import { ptBr } from './localeConfig';

LocaleConfig.locales['pt-br'] = ptBr;

LocaleConfig.defaultLocale = 'pt-br';

interface MarkedDateProps {
    [date: string]: {
        color: string;
        textColor: string;
        disabled?: boolean;
        disabledTouchEvent?: boolean;
    }
}

interface CalendarProps {
    markedDates: MarkedDateProps;
    onDayPress: DateCallbackHandler
}

interface DayProps {
    dateString: string;
    day: number;
    month: number;
    year: number;
    timestamp: number;
}

function Calendar({ markedDates, onDayPress }: CalendarProps) {
    const theme = useTheme();

    return (
        <CustomCalendar
            renderArrow={( direction ) => 
                <Feather
                    name={direction === 'left'
                        ? 'chevron-left'
                        : 'chevron-right'
                    }
                    color={theme.colors.text}
                    size={24}
                />
            }
            headerStyle={{
                backgroundColor: theme.colors.background_secondary,
                borderBottomWidth: 0.5,
                borderBottomColor: theme.colors.text_detail,
                paddingBottom: 10,
                marginBottom: 10
            }}

            theme={{
                textDayFontFamily: theme.fonts.primary_400,
                textDayHeaderFontFamily: theme.fonts.primary_500,
                textDayHeaderFontSize: 10,
                textMonthFontSize: 20,
                textMonthFontFamily: theme.fonts.secondary_600,
                monthTextColor: theme.colors.title,
                arrowStyle: {
                    marginHorizontal: -15
                }
            }}

            firstDay={1}
            minDate={new Date()}
            markingType="period"
            markedDates={markedDates}
            onDayPress={onDayPress}
        />
    );
}

export {
    Calendar,
    MarkedDateProps,
    DayProps,
    generateInterval
}