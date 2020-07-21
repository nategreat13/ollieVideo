//
//  RNCameraRoll.m
//  ollieVideo
//
//  Created by Nate on 4/24/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(RNCameraRoll, NSObject)
RCT_EXTERN_METHOD(SaveToCameraRoll:(NSString *)uri)
@end
